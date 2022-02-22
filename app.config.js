import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      backendURL: process.env.BACKEND_URL,
    },
  };
};
