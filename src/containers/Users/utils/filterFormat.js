export default function (params) {
    const formattedParams = [];
    formattedParams.push({label: 'startIndex', value: params.startIndex});
    formattedParams.push({label: 'entryNr', value: params.entryNr});
    formattedParams.push({label: 'orderBy', value: params.orderBy});
    formattedParams.push({label: 'orderDir', value: params.orderDir});
    return formattedParams;
}