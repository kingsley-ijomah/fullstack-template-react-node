import AxiosInstance from './AxiosInstance';

export default function useFetch(url, method, success, failure) {
  const [axiosInstance] = AxiosInstance();

  const axiosMethods = {
    GET: axiosInstance.get,
    POST: axiosInstance.post,
    PUT: axiosInstance.put,
    DELETE: axiosInstance.delete,
  };

  const handleFetch = async (data) => {
    try {
      const methodToUse = axiosMethods[method];
      const response = await methodToUse(url, data);
      success(response.data);
    } catch (error) {
      failure(error.response);
    }
  };

  return [handleFetch];
}
