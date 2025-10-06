import React, { useState } from 'react';
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaYoutube,
} from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';
import styles from '../styles/ChannelSelector.module.css';

type Channel =
  | 'twitter'
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'pinterest'
  | 'youtube'
  | 'threads';

const channels: Channel[] = ['twitter', 'facebook', 'instagram', 'linkedin', 'pinterest', 'youtube', 'threads'];

const ChannelIcon: Record<Channel, JSX.Element> = {
  twitter: <FaTwitter size={20} />,
  facebook: <FaFacebook size={23} />,
  instagram: <FaInstagram size={24} />,
  linkedin: <FaLinkedin size={23} />,
  pinterest: <FaPinterest size={23} />,
  youtube: <FaYoutube size={23} />,
  threads: <SiThreads size={20} />,
};

const ChannelStyle: Record<Channel, string> = {
  twitter: styles.twitter,
  facebook: styles.facebook,
  instagram: styles.instagram,
  linkedin: styles.linkedin,
  pinterest: styles.pinterest,
  youtube: styles.youtube,
  threads: styles.threads,
};

export default function ChannelSelector() {
  const [selectedChannels, setSelectedChannels] = useState<Set<Channel>>(new Set());

  const toggleChannel = (channel: Channel) => {
    const newSelected = new Set(selectedChannels);
    if (newSelected.has(channel)) {
      newSelected.delete(channel);
    } else {
      newSelected.add(channel);
    }
    setSelectedChannels(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedChannels.size === channels.length) {
      setSelectedChannels(new Set());
    } else {
      setSelectedChannels(new Set(channels));
    }
  };

  return (
    <div className={styles.container}>
      {/* Single horizontal line container */}
      <div className={styles.horizontalWrapper}>
        {/* Title */}
        <h2 className={styles.title}>Select Channels</h2>

        {/* Icons */}
        <div className={styles.iconWrapper}>
          {channels.map((channel) => (
            <button
              key={channel}
              className={`${styles.iconButton} ${ChannelStyle[channel]} ${
                selectedChannels.has(channel) ? styles.selected : ''
              }`}
              onClick={() => toggleChannel(channel)}
              aria-pressed={selectedChannels.has(channel)}
            >
              {ChannelIcon[channel]}
            </button>
          ))}
        </div>

        {/* Select All Button */}
        <button className={styles.selectAllButton} onClick={toggleSelectAll}>
          {selectedChannels.size === channels.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>
    </div>
  );
}