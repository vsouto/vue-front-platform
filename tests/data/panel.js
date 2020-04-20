import PanelModel from "@/models/panel"

export const panels = () => [new PanelModel({
  panel_id: 1,
  name: "panel"
}),
new PanelModel({
  panel_id: 2,
  name: "dev panel"
})
]
