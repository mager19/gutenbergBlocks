import { useBlockProps, RichText } from "@wordpress/block-editor";



// @see https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/panel#panelbody

export default function Edit(props) {
	const blockProps = useBlockProps();


	return <>
		<div {...blockProps}>
			<RichText
				allowedFormats={[]}
				placeholder="Label text"
				value={props.attributes.labelText}
				multiline={false}
				onSplit={() => { }}
				onReplace={() => { }}
				onChange={(newValue) => {
					props.setAttributes({
						"labelText": newValue,
					});
				}}
			/>
		</div>
	</>
}
