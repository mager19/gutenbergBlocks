import {
	useBlockProps,
	useInnerBlocksProps,
	RichText
} from "@wordpress/block-editor";


import "./editor.scss";


export default function Edit(props) {
	const blockProps = useBlockProps();
	const { attributes, setAttributes } = props;
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: [["blockylicious/features-item", {}]],
		allowedBlocks: ["blockylicious/features-item"]
	})

	return (
		<>
			<div {...blockProps}>
				<RichText
					tagName="span"
					value={attributes.eyebrow}
					onChange={(newValue) => {
						setAttributes({
							eyebrow: newValue
						})
					}}
				/>
				<RichText
					tagName="h2"
					value={attributes.title}
					onChange={(newValue) => {
						setAttributes({
							title: newValue
						})
					}}
				/>
				<RichText
					tagName="p"
					value={attributes.description}
					onChange={(newValue) => {
						setAttributes({
							description: newValue
						})
					}}
				/>
			</div>
			<div {...innerBlocksProps} />
		</>
	);

}
