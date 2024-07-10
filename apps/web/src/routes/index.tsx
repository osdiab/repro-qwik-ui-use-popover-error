import { component$ } from "@builder.io/qwik";
import { Tooltip } from "~/components/tooltip";

export default component$(() => {
  return (
    <>
      <Tooltip>
        <div q:slot="trigger">Hover me</div>
        <div q:slot="content">Hello there</div>
      </Tooltip>
    </>
  );
});
