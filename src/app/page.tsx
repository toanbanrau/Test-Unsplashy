import CallBackExample from "./components/CallbackExample";
import MemoExample from "./components/MemoExample";

export default async function Home() {
  return (
    <div>
      <MemoExample />
      <CallBackExample />
    </div>
  );
}
