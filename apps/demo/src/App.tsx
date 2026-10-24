import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardTitle,
  Dialog,
  EmptyState,
  Input,
  Metric,
  SegmentedControl,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Tabs,
  Tooltip,
} from "@jieli/strata-ui";

const transactions = [
  { merchant: "Slack", category: "Software", status: "Cleared", card: "•• 4821", date: "Oct 21", amount: "$1,250.00" },
  { merchant: "Delta Air Lines", category: "Travel", status: "Pending", card: "•• 1147", date: "Oct 21", amount: "$486.20" },
  { merchant: "Notion", category: "Software", status: "Cleared", card: "•• 4821", date: "Oct 20", amount: "$96.00" },
  { merchant: "Uber", category: "Transport", status: "Flagged", card: "•• 3345", date: "Oct 20", amount: "$34.50" },
  { merchant: "AWS", category: "Infrastructure", status: "Cleared", card: "•• 9142", date: "Oct 19", amount: "$8,420.18" },
  { merchant: "FedEx", category: "Logistics", status: "Cleared", card: "•• 3345", date: "Oct 18", amount: "$112.40" },
];

function statusVariant(status: string): "success" | "warning" | "destructive" {
  if (status === "Cleared") return "success";
  if (status === "Pending") return "warning";
  return "destructive";
}

function ComponentShowcase() {
  return (
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

        <Card>
          <CardTitle>States</CardTitle>
          <CardDescription>Loading and empty — designed, not afterthoughts.</CardDescription>
          <div className="demo-states">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Skeleton style={{ height: 16 }} />
              <Skeleton style={{ height: 16, width: "70%" }} />
              <Skeleton style={{ height: 40 }} />
            </div>
            <EmptyState
              title="No transactions"
              description="Transactions will appear here once you add a card."
            >
              <Button size="sm" variant="secondary">Add card</Button>
            </EmptyState>
          </div>
        </Card>
      </main>
  );
}

function SpendOverview() {
  const [period, setPeriod] = useState("this-month");

  return (
    <div className="demo-ref">
      <div className="demo-metrics">
        <Metric label="Total spend" value="$48,210.00" delta="+4.2%" tone="neutral" />
        <Metric label="Policy flags" value="7" delta="+2" tone="negative" />
        <Metric label="Active cards" value="142" delta="+12" tone="neutral" />
        <Metric label="Est. savings" value="$3,610.00" delta="+7.5%" tone="positive" />
      </div>

      <Card className="demo-table-card">
        <div className="demo-card-head">
          <div>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>128 transactions this period</CardDescription>
          </div>
          <SegmentedControl
            options={[
              { value: "this-month", label: "This month" },
              { value: "last-month", label: "Last month" },
              { value: "ytd", label: "YTD" },
            ]}
            value={period}
            onValueChange={setPeriod}
          />
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Merchant</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Card</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell align="right">Amount</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.merchant}>
                <TableCell>{t.merchant}</TableCell>
                <TableCell>{t.category}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(t.status)}>{t.status}</Badge>
                </TableCell>
                <TableCell>{t.card}</TableCell>
                <TableCell>{t.date}</TableCell>
                <TableCell align="right">{t.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [view, setView] = useState("components");

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

      <div className="demo-view">
        <SegmentedControl
          options={[
            { value: "components", label: "Components" },
            { value: "spend", label: "Reference · Spend" },
          ]}
          value={view}
          onValueChange={setView}
        />
      </div>

      {view === "spend" ? <SpendOverview /> : <ComponentShowcase />}
    </div>
  );
}

