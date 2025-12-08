import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.css';
import React from 'react';

// Function to get a random attribution link
const getRandomAttribution = async () => {
    const defaultAttribution = { url: 'https://mapembeds.com', text: 'mapembeds.com' };
    try {
        console.log('Fetching attribution links...');
        // Use a CORS proxy to avoid cross-origin issues
        const response = await fetch('https://api.allorigins.win/raw?url=https://mapembeds.com/l.json');
        console.log('Fetch response:', response);
        
        if (!response.ok) {
            console.error('Failed to fetch attribution:', response.status);
            return defaultAttribution;
        }
        
        const text = await response.text();
        console.log('Received text:', text);
        
        let data;
        try {
            data = JSON.parse(text);
            console.log('Parsed data:', data);
        } catch (parseError) {
            console.error('Failed to parse attribution JSON:', parseError);
            return defaultAttribution;
        }
        
        // Validate data structure
        if (!Array.isArray(data) || data.length === 0) {
            console.error('Invalid attribution data structure');
            return defaultAttribution;
        }
        
        // Validate that the random item has the required properties
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomItem = data[randomIndex];
        console.log('Selected attribution:', randomItem);
        
        if (!randomItem?.url || !randomItem?.text) {
            console.error('Invalid attribution item structure');
            return defaultAttribution;
        }
        
        return randomItem;
    } catch (error) {
        console.error('Error fetching attribution:', error);
        return defaultAttribution;
    }
};

registerBlockType('super-simple-map-embeds/map', {
    attributes: {
        address: {
            type: 'string',
            default: ''
        },
        zoom: {
            type: 'number',
            default: 14
        },
        height: {
            type: 'number',
            default: 400
        },
        attributionUrl: {
            type: 'string',
            source: 'attribute',
            selector: 'a',
            attribute: 'href',
            default: 'https://mapembeds.com'
        },
        attributionText: {
            type: 'string',
            source: 'text',
            selector: 'a',
            default: 'mapembeds.com'
        }
    },

    edit: ({ attributes, setAttributes, clientId }) => {
        const { address, zoom, height, attributionUrl, attributionText } = attributes;
        const blockProps = useBlockProps();
        const [attributionFetched, setAttributionFetched] = React.useState(false);

        // Fetch random attribution only once when block is first added
        React.useEffect(() => {
            // Only fetch if we haven't fetched before and using default values
            if (!attributionFetched && 
                attributionUrl === 'https://mapembeds.com' && 
                attributionText === 'mapembeds.com') {
                getRandomAttribution().then(attribution => {
                    setAttributes({
                        attributionUrl: attribution.url,
                        attributionText: attribution.text
                    });
                    setAttributionFetched(true);
                });
            }
        }, []);

        const generateMapUrl = (address) => {
            if (!address) return '';
            const encodedAddress = encodeURIComponent(address);
            return `https://maps.google.com/maps?q=${encodedAddress}&output=embed&z=${zoom}`;
        };

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title={__('Map Settings', 'map-embed-block')}>
                        <TextControl
                            label={__('Address or Place', 'map-embed-block')}
                            value={address}
                            onChange={(value) => setAttributes({ address: value })}
                            help={__('Enter an address or place name', 'map-embed-block')}
                        />
                        <RangeControl
                            label={__('Zoom Level', 'map-embed-block')}
                            value={zoom}
                            onChange={(value) => setAttributes({ zoom: value })}
                            min={1}
                            max={20}
                        />
                        <RangeControl
                            label={__('Height', 'map-embed-block')}
                            value={height}
                            onChange={(value) => setAttributes({ height: value })}
                            min={200}
                            max={800}
                            step={10}
                        />
                    </PanelBody>
                </InspectorControls>
                
                {!address ? (
                    <div className="map-embed-placeholder">
                        <p>{__('Enter an address in the block settings to display a map.', 'map-embed-block')}</p>
                    </div>
                ) : (
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'relative', paddingBottom: '75%', height: 0, overflow: 'hidden' }}>
                            <iframe
                                src={generateMapUrl(address)}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                                loading="lazy"
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                            />
                        </div>
                        <a 
                            href={attributionUrl}
                            rel="noopener" 
                            target="_blank"
                            style={{ 
                                position: 'absolute',
                                width: '1px',
                                height: '1px',
                                padding: 0,
                                margin: '-1px',
                                overflow: 'hidden',
                                clip: 'rect(0,0,0,0)',
                                whiteSpace: 'nowrap',
                                border: 0
                            }}
                        >
                            {attributionText}
                        </a>
                    </div>
                )}
            </div>
        );
    },

    save: ({ attributes }) => {
        const { address, zoom, height, attributionUrl, attributionText } = attributes;
        const blockProps = useBlockProps.save();

        if (!address) return null;

        const encodedAddress = encodeURIComponent(address);
        const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&output=embed&z=${zoom}`;

        return (
            <div {...blockProps}>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'relative', paddingBottom: '75%', height: 0, overflow: 'hidden' }}>
                        <iframe
                            src={mapUrl}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                            loading="lazy"
                            allowFullScreen=""
                            aria-hidden="false"
                            tabIndex="0"
                        />
                    </div>
                    <a 
                        href={attributionUrl}
                        rel="noopener" 
                        target="_blank"
                        style={{ 
                            position: 'absolute',
                            width: '1px',
                            height: '1px',
                            padding: 0,
                            margin: '-1px',
                            overflow: 'hidden',
                            clip: 'rect(0,0,0,0)',
                            whiteSpace: 'nowrap',
                            border: 0
                        }}
                    >
                        {attributionText}
                    </a>
                </div>
            </div>
        );
    },
}); 