import { useBlockProps, BlockControls, useInnerBlocksProps } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton, Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { ImageThumbnail } from '../../components/imageThumbnail';
import "./editor.scss";

export default function Edit(props) {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps({
		className: "piccy-gallery-inner-blocks",
	}, {
		allowedBlocks: ["blockylicious/piccy-image"],
	});
	const [editorMode, setEditorMode] = useState(true);
	const innerBlocks = useSelect((select) => {
		const { getBlocksByClientId } = select("core/block-editor");
		const block = getBlocksByClientId(props.clientId)?.[0];
		return block?.innerBlocks;
	}, [props.clientId]);

	const [previewModeImage, setPreviewModeImage] = useState({
		imageId: innerBlocks?.[0]?.attributes?.imageId,
		blockId: innerBlocks?.[0]?.clientId
	});

	return <>
		<div {...blockProps}>
			{!!editorMode && <div className="editor-mode">
				<span className='piccy-label'>{__("Piccy Image Gallery", metadata.textdomain)}</span>
				<div {...innerBlocksProps} />
			</div>
			}
			{!editorMode &&
				<>
					<div className='preview-mode'>{(innerBlocks || []).map(innerBlock => (
						<ImageThumbnail
							key={innerBlock.clientId}
							imageId={innerBlock.attributes.imageId}
							height={75}
							onClick={() => {
								setPreviewModeImage({
									imageId: innerBlock.attributes.imageId,
									blockId: innerBlock.clientId
								});
							}}
							className={`thumb ${innerBlock.clientId === previewModeImage.blockId ? 'selected' : ''}`}
						/>
					))}
					</div>
					<div>
						<ImageThumbnail height="initial" imageId={previewModeImage?.imageId} />
					</div>
				</>
			}
		</div>

		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon={
						editorMode ? (
							<Icon icon="welcome-view-site" />
						) : (
							<Icon icon="edit" />
						)
					}
					label={
						editorMode
							? __("Preview Gallery", metadata.textdomain)
							: __("Edit Gallery", metadata.textdomain)
					}
					onClick={() => {
						setEditorMode((prevState) => !prevState);
					}}
				/>
			</ToolbarGroup>
		</BlockControls>
	</>;
}
