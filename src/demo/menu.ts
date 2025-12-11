// This string is used in main.js or App.vue
export const EXAMPLE_YML_DEFINITION = `
desktop_layout:
  grid_definition:
    rows: 10
    cols: 10
    cell_size: 96
  
  background:
    type: "mesh_gradient"
    config:
      colors:
        - "hsla(280, 80%, 70%, 1)"
        - "hsla(200, 90%, 65%, 1)"
        - "hsla(330, 80%, 75%, 1)"
        - "hsla(40, 90%, 70%, 1)"

  widgets:
    - name: "system_monitor"
      type: "analog-clock"
      data_source: "local_system_api"
      size: 150
      timezone: "Europe/London"
      grid_position: {row: 1, col: 5}
      grid_span: { rows: 2, cols: 3 }

  items:
    - type: "icon"
      name: "Docs"
      icon_image_path: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/google-docs.png"
      launch_url: "https://docs.google.com"
      grid_position: { row: 1, col: 1 }

    - type: "icon"
      name: "Mail"
      icon_image_path: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/gmail.png"
      launch_url: "https://mail.google.com"
      grid_position: { row: 1, col: 2 }

    - type: "group"
      name: "Dev Tools"
      group_icon_path: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/dev-push.png"
      grid_position: { row: 1, col: 3 }
      icons:
        - name: "GitHub"
          icon_image_path: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/github.png"
          launch_url: "https://github.com"
        - name: "GitLab"
          icon_image_path: "https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/gitlab.png"
          launch_url: "https://gitlab.com"
`
