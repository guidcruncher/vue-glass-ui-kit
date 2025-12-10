// This string is used in main.js or App.vue
export const EXAMPLE_YML_DEFINITION = `
desktop_layout:
  grid_definition:
    rows: 10
    cols: 10
    cell_size: 96
  
  background:
    type: "glassmorphic_mesh"
    config:
      mesh_settings:
        blur_strength: 20
        opacity: 0.9
        color_tint_hex: "#3A506B"
        light_source_position: "top_right"
  
  widgets:
    - name: "system_monitor"
      type: "native"
      data_source: "local_system_api"
      grid_position: { row: 1, col: 7 }
      grid_span: { rows: 2, cols: 3 }
      
  items:
    - type: "icon"
      name: "Docs"
      icon_image_path: "https://example.com/icons/doc.png"
      launch_url: "https://docs.google.com"
      grid_position: { row: 1, col: 1 }

    - type: "icon"
      name: "Mail"
      icon_image_path: "https://example.com/icons/mail.png"
      launch_url: "https://mail.google.com"
      grid_position: { row: 2, col: 1 }

    - type: "group"
      name: "Dev Tools"
      group_icon_path: "https://example.com/icons/dev.png"
      grid_position: { row: 3, col: 1 }
      icons:
        - name: "GitHub"
          icon_image_path: "https://example.com/icons/github.png"
          launch_url: "https://github.com"
        - name: "GitLab"
          icon_image_path: "https://example.com/icons/gitlab.png"
          launch_url: "https://gitlab.com"
`
