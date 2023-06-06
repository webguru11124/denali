import config from 'app/config';

const createAssetUrl = (url: string) => `${config.env.chatUri}/api/${url}`;

export default createAssetUrl;
