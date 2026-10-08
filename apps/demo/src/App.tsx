import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardTitle,
  Dialog,
  Input,
  Select,
  Tabs,
  Tooltip,
} from "@jieli/strata-ui";

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "strata-dark demo-shell" : "demo-shell"}>
      <header className="demo-header">
        <div>
          <h1>Strata</h1>
          <p>A layered design system — tokens → components → adoption.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setDark((d) => !d)}>
          Toggle {dark ? "light" : "dark"}
        </Button>
      </header>

      <main className="demo-main">
        <Card>
          <CardTitle>Buttons &amp; badges</CardTitle>
          <CardDescription>Variants and sizes driven by design tokens.</CardDescription>
          <div className="demo-row">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="demo-row">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </Card>

        <Card>
          <CardTitle>Form</CardTitle>
          <CardDescription>Input and Select, token-driven and accessible.</CardDescription>
          <div className="demo-stack">
            <Input placeholder="name@company.com" type="email" />
            <Select.Root defaultValue="Gala">
              <Select.Trigger>
                <Select.Value placeholder="Choose an apple" />
                <Select.Icon>▾</Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner sideOffset={4}>
                  <Select.Popup>
                    <Select.Item value="Gala">
                      <Select.ItemText>Gala</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="Fuji">
                      <Select.ItemText>Fuji</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="Honeycrisp">
                      <Select.ItemText>Honeycrisp</Select.ItemText>
                    </Select.Item>
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>
          </div>
        </Card>

        <Card>
          <CardTitle>Tabs</CardTitle>
          <Tabs.Root defaultValue="overview">
            <Tabs.List>
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="projects">Projects</Tabs.Tab>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Panel value="overview">Workspace stats and activity.</Tabs.Panel>
            <Tabs.Panel value="projects">Milestones and deadlines.</Tabs.Panel>
          </Tabs.Root>
        </Card>

        <Card>
          <CardTitle>Dialog &amp; tooltip</CardTitle>
          <CardDescription>Accessible overlays on Base UI primitives.</CardDescription>
          <div className="demo-row">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger className="strata-button strata-button--secondary strata-button--sm">
                  Hover me
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Positioner sideOffset={6}>
                    <Tooltip.Popup>
                      <Tooltip.Arrow />
                      Short hint text
                    </Tooltip.Popup>
                  </Tooltip.Positioner>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>

            <Dialog.Root>
              <Dialog.Trigger className="strata-button strata-button--primary strata-button--sm">
                Open dialog
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Backdrop />
                <Dialog.Popup>
                  <Dialog.Title>Delete project?</Dialog.Title>
                  <Dialog.Description>This action cannot be undone.</Dialog.Description>
                  <div className="demo-row" style={{ justifyContent: "flex-end", marginTop: 0 }}>
                    <Dialog.Close>Cancel</Dialog.Close>
                    <button
                      className="strata-button strata-button--primary strata-button--sm"
                      type="button"
                    >
                      Confirm
                    </button>
                  </div>
                </Dialog.Popup>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </Card>
      </main>
    </div>
  );
}

