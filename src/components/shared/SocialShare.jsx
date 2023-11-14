import { Box } from '@mui/material';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

/**
 * A Component for share social icon
 * @param {object} param0
 * @returns social icons component
 */

const SocialShare = ({ url, title, hastag, hastags, size = 24 }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <WhatsappShareButton title={title} url={url}>
        <WhatsappIcon round={true} size={size} />
      </WhatsappShareButton>

      <LinkedinShareButton title={title} url={url}>
        <LinkedinIcon round={true} size={size} />
      </LinkedinShareButton>

      <TwitterShareButton title={title} hashtags={hastags} url={url}>
        <TwitterIcon round={true} size={size} />
      </TwitterShareButton>

      <FacebookShareButton quote={title} hashtag={hastag} url={url}>
        <FacebookIcon round={true} size={size} />
      </FacebookShareButton>
    </Box>
  );
};

export default SocialShare;
