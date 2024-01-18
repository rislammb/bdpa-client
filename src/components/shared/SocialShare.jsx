import PropTypes from 'prop-types';

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

const SocialShare = ({ url, title, hashtag, hashtags, size = 24 }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <WhatsappShareButton title={title} url={url}>
        <WhatsappIcon round={true} size={size} />
      </WhatsappShareButton>

      <LinkedinShareButton title={title} url={url}>
        <LinkedinIcon round={true} size={size} />
      </LinkedinShareButton>

      <TwitterShareButton title={title} hashtags={hashtags} url={url}>
        <TwitterIcon round={true} size={size} />
      </TwitterShareButton>

      <FacebookShareButton quote={title} hashtag={hashtag} url={url}>
        <FacebookIcon round={true} size={size} />
      </FacebookShareButton>
    </Box>
  );
};

export default SocialShare;

SocialShare.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  hashtag: PropTypes.string,
  hashtags: PropTypes.array,
  size: PropTypes.number,
};
