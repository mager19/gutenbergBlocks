import { useBlockProps, MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import metadata from "./block.json";
import { useSelect } from "@wordpress/data";
import { Icon } from '@wordpress/components';
import { ImageThumbnail } from '../../components/imageThumbnail';
import "./editor.scss";
import { useImage } from '../../hooks/useImage';

export default function Edit(props) {
	const blockProps = useBlockProps();
	const image = useImage(props.attributes.imageId);

	const imageSeleted = !!props.attributes.imageId && !!image?.source_url;

	return (<div {...blockProps}>
		{!!imageSeleted && (

			<ImageThumbnail imageId={props.attributes.imageId} />
		)

		}{!imageSeleted && (
			<div style={{ display: "flex", height: 150, width: '100%', background: 'olive' }}>
				<span style={{ margin: "auto" }}>
					Image
				</span>
			</div>
		)}
		<MediaUploadCheck>
			<MediaUpload allowedTypes={["image"]} render={({ open }) => {
				return (
					<button className='media-select' onClick={open}>
						{imageSeleted
							? __("Replace Image", metadata.textdomain)
							: __("Upload Image", metadata.textdomain)}
					</button>
				);
			}}
				value={props.attributes.imageId}
				onSelect={(item) => {
					props.setAttributes({
						imageId: item.id
					});
				}}
			/>
		</MediaUploadCheck>
	</div >);

}
