import ApiService from './ApiService';

export default (query: string, variables: object, queryType?: string) => {
  return ApiService.postRequest('graphql', {
    query: query,
    variables: variables
  })
  .then((r: any)=> {
    if (r.errors) {
      throw new Error(JSON.stringify(r.errors))
    }
    if (!r.data) {
      throw new Error('There was an error with your query')
    }
    if (queryType) {
      return r.data[queryType];
    }
    return r.data;
  })
};