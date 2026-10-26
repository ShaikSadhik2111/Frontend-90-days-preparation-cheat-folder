import { useCallback, useState } from "react";
import { searchUsers, USERS, User } from "./api/mockApi";
import { Autocomplete } from "./components/Autocomplete/Autocomplete";
import { DataTable, Column } from "./components/DataTable/DataTable";
import { Tabs } from "./components/Tabs/Tabs";
import { Modal } from "./components/Modal/Modal";
import { StarRating } from "./components/StarRating/StarRating";
import { OtpInput } from "./components/OtpInput/OtpInput";
import { TodoApp } from "./components/TodoApp/TodoApp";
import { InfiniteList } from "./components/InfiniteList/InfiniteList";
import { Accordion } from "./components/Accordion/Accordion";
import { Kanban } from "./components/Kanban/Kanban";

const columns: Column<User>[] = [
  { key: "id", header: "ID", sortable: true },
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", sortable: true },
  { key: "age", header: "Age", sortable: true },
];

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <Modal open={open} onClose={() => setOpen(false)} title="Confirm migration">
        <p>Switch this page from AngularJS to the React version?</p>
        <button onClick={() => setOpen(false)}>Cancel</button> <button onClick={() => setOpen(false)}>Confirm</button>
      </Modal>
    </>
  );
}

export default function App() {
  const [picked, setPicked] = useState<User | null>(null);
  // stable fetcher reference → effect in Autocomplete doesn't re-run every render
  const fetcher = useCallback((q: string, signal: AbortSignal) => searchUsers(q, signal), []);

  return (
    <main className="app">
      <h1>Machine coding practice</h1>
      <p className="muted">Build each one yourself in 45–60 min first. Then compare with this version and read the tests.</p>
      <Tabs defaultValue="autocomplete">
        <Tabs.List label="Problems">
          <Tabs.Tab value="autocomplete">Autocomplete</Tabs.Tab>
          <Tabs.Tab value="table">Data table</Tabs.Tab>
          <Tabs.Tab value="infinite">Infinite scroll</Tabs.Tab>
          <Tabs.Tab value="todo">Todo</Tabs.Tab>
          <Tabs.Tab value="modal">Modal</Tabs.Tab>
          <Tabs.Tab value="widgets">Stars / OTP / Accordion</Tabs.Tab>
          <Tabs.Tab value="kanban">Kanban</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="autocomplete">
          <Autocomplete<User> label="Search users" fetcher={fetcher} getLabel={(u) => u.name} getKey={(u) => u.id} onSelect={setPicked} />
          {picked && <p>Selected: {picked.name} ({picked.email})</p>}
        </Tabs.Panel>
        <Tabs.Panel value="table"><DataTable rows={USERS} columns={columns} getRowId={(u) => u.id} /></Tabs.Panel>
        <Tabs.Panel value="infinite"><InfiniteList /></Tabs.Panel>
        <Tabs.Panel value="todo"><TodoApp /></Tabs.Panel>
        <Tabs.Panel value="modal"><ModalDemo /></Tabs.Panel>
        <Tabs.Panel value="widgets">
          <h3>Star rating</h3><StarRating />
          <h3>OTP input</h3><OtpInput onComplete={(c) => console.log("OTP", c)} />
          <h3>Accordion</h3>
          <Accordion items={[
            { id: "a", title: "What is the digest cycle?", content: "AngularJS dirty-checking loop over watchers." },
            { id: "b", title: "What is reconciliation?", content: "React's diff of the previous and next element trees." },
          ]} />
        </Tabs.Panel>
        <Tabs.Panel value="kanban"><Kanban /></Tabs.Panel>
      </Tabs>
    </main>
  );
}
