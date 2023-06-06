const getFileNameFromUrl = (url: string) => url.split('/').pop() || '';

export default getFileNameFromUrl;
