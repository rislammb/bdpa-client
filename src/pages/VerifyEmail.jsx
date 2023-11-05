import { Alert, AlertTitle, Box } from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ColorTitle from '../components/ui/ColorTitle';

const VerifyEmail = () => {
  let { emailToken } = useParams();
  const navigate = useNavigate();

  const {
    ui: { language },
    auth: { submitting, error },
  } = useStoreState((state) => state);
  const { emailVerification } = useStoreActions((actions) => actions.auth);
  const [isSuccess, setIsSuccess] = useState(null);

  const isBn = language === 'BN' ? true : false;

  useEffect(() => {
    if (emailToken) {
      const verifyEmail = async () => {
        const res = await emailVerification({ emailToken });

        if (res) {
          setIsSuccess(true);
          setTimeout(() => {
            return navigate('/auth/set-password', {
              state: { email: res.email },
            });
          }, 3000);
        }
      };

      verifyEmail();
    }
  }, [emailToken]);

  return (
    <Box
      sx={{
        my: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {submitting && (
        <ColorTitle
          text={isBn ? 'ইমেল যাচাই করা হচ্ছে ...' : 'Email verifying ...'}
          variant={'h5'}
        />
      )}

      {!submitting && error && (
        <Alert
          severity='error'
          variant='outlined'
          sx={{
            fontSize: '18px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isBn ? error.bn_text : error.text}
        </Alert>
      )}

      {isSuccess && (
        <Alert
          severity='success'
          sx={{
            fontSize: '18px',
            textAlign: 'left',
          }}
        >
          <AlertTitle>
            {isBn
              ? 'ইমেল সফলভাবে যাচাই করা হয়েছে৷'
              : 'Email successfully verified.'}
          </AlertTitle>
          <strong>
            {isBn ? 'পুনঃনির্দেশ করা হচ্ছে...' : 'Redirecting ...'}
          </strong>
        </Alert>
      )}
    </Box>
  );
};

export default VerifyEmail;
