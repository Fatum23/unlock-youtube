// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::menu::{MenuBuilder, MenuItem};
use tauri::tray::{MouseButton, TrayIconBuilder, TrayIconEvent};
use tauri::{Emitter, Listener, Manager};
use tauri_plugin_shell::ShellExt;

use std::sync::{Arc, RwLock};

#[tauri::command]
fn show_main_window(handle: tauri::AppHandle) {
    let _ = handle.get_webview_window("main").unwrap().show();
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_prevent_default::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            let _ = app.get_webview_window("main").unwrap().show();
        }))
        .invoke_handler(tauri::generate_handler![show_main_window])
        .on_window_event(|window, event| match event {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                window.hide().unwrap();
                api.prevent_close();
            }
            _ => {}
        })
        .setup(|app| {
            let handle_clone = app.handle().clone();
            let handle_clone2 = app.handle().clone();

            let process = Arc::new(RwLock::new(None));

            let process_clone = Arc::clone(&process);

            let toggle_tray_button =
                MenuItem::with_id(app, "toggle", "On", true, None::<&str>).unwrap();

            let toggle_tray_button_clone = toggle_tray_button.clone();

            let menu = MenuBuilder::new(app)
                .items(&[
                    &MenuItem::with_id(app, "show", "Show window", true, None::<&str>).unwrap(),
                    &toggle_tray_button,
                    &MenuItem::with_id(app, "quit", "Quit", true, None::<&str>).unwrap(),
                ])
                .build()
                .unwrap();

            let _tray = TrayIconBuilder::new()
                .tooltip("Unlock Youtube")
                .icon(handle_clone.default_window_icon().cloned().unwrap())
                .on_tray_icon_event(move |_tray, event| match event {
                    TrayIconEvent::Click {
                        id: _,

                        position: _,

                        rect: _,

                        button,

                        button_state: _,
                    } => match button {
                        MouseButton::Left => {
                            let _ = handle_clone.get_webview_window("main").unwrap().show();
                        }

                        _ => {}
                    },

                    _ => {}
                })
                .on_menu_event(move |app, event| match event.id.as_ref() {
                    "show" => {
                        app.get_webview_window("main")
                            .unwrap()
                            .show()
                            .expect("To show the window");
                    }

                    "toggle" => {
                        app.emit(
                            "on",
                            if toggle_tray_button.text().unwrap() == "On" {
                                true
                            } else {
                                false
                            },
                        )
                        .unwrap();
                    }

                    "quit" => {
                        std::process::exit(0);
                    }

                    _ => {}
                })
                .menu(&menu)
                .build(app);

            app.listen("on", move |event| {
                println!("{}", event.payload());
                let sidecar_command = handle_clone2.shell().sidecar("goodbyedpi").unwrap();

                if event.payload() == "true" {
                    let (mut _rx, child) = sidecar_command
                        .args([
                            "-9",
                            "--blacklist",
                            "./russia-blacklist.txt",
                            "--blacklist",
                            "./russia-youtube.txt",
                        ])
                        .spawn()
                        .expect("Failed to spawn sidecar");

                    *process_clone.write().unwrap() = Some(child);
                    toggle_tray_button_clone.set_text("Off").unwrap();
                } else {
                    if let Some(value) = process_clone.write().unwrap().take() {
                        let _ = value.kill();
                    }
                    toggle_tray_button_clone.set_text("On").unwrap();
                }
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
