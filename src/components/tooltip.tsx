import {
	$,
	type PropsOf,
	type Signal,
	Slot,
	component$,
	useId,
	useSignal,
	useTask$,
} from "@builder.io/qwik";
import {
	isServer
} from "@builder.io/qwik/build";
import { Popover, usePopover } from "@qwik-ui/headless";


export interface TooltipProps
	extends Omit<PropsOf<typeof Popover.Root>, "manual"> {
}
export const Tooltip = component$<TooltipProps>(
	({ id, ...rest }) => {
		const generatedId = useId();
		const popoverId = id ?? generatedId;
		const anchorRef = useSignal<HTMLElement | undefined>();
		const { showPopover, hidePopover } = usePopover(popoverId);

		const focused = useSignal(false);
		const hovered = useSignal(false);

		useTask$(({ track }) => {
			track(() => focused.value);
			track(() => hovered.value);
			if (isServer) {
				return;
			}

			if (focused.value || hovered.value) {
				showPopover();
			} else {
				hidePopover();
			}
		});

		return (
			<Popover.Root
				gutter={8}
				{...rest}
				id={popoverId}
				bind:anchor={anchorRef}
				manual
			>
				<div
					ref={anchorRef}
					onFocusIn$={() => {
						focused.value = true;
					}}
					onFocusOut$={() => {
						focused.value = false;
					}}
					onMouseOver$={() => {
						hovered.value = true;
					}}
					onMouseOut$={() => {
						hovered.value = false;
					}}
				>
					<Slot name="trigger" />
				</div>
				<Popover.Panel>
					<div>
						<Slot name="content" />
					</div>
				</Popover.Panel>
			</Popover.Root>
		);
	},
);
