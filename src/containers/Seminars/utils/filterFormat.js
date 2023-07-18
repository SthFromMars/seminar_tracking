export default function (params) {
    const formattedParams = [];
    formattedParams.push({label: 'startIndex', value: params.startIndex});
    formattedParams.push({label: 'entryNr', value: params.entryNr});
    formattedParams.push({label: 'orderBy', value: params.orderBy});
    formattedParams.push({label: 'orderDir', value: params.orderDir});
    const {startDateBegin, startDateEnd} = params.filterInfo;
    if(params.filterInfo.filterByStartDate && startDateBegin && startDateEnd && startDateBegin <= startDateEnd){
        formattedParams.push({label: 'startDateBegin', value: `${startDateBegin.getFullYear()}-${startDateBegin.getMonth()+1}-${startDateBegin.getDate()}`});
        formattedParams.push({label: 'startDateEnd', value: `${startDateEnd.getFullYear()}-${startDateEnd.getMonth()+1}-${startDateEnd.getDate()}`});
    }
    const {endDateBegin, endDateEnd} = params.filterInfo;
    if(params.filterInfo.filterByEndDate && endDateBegin && endDateEnd && endDateBegin <= endDateEnd){
        formattedParams.push({label: 'endDateBegin', value: `${endDateBegin.getFullYear()}-${endDateBegin.getMonth()+1}-${endDateBegin.getDate()}`});
        formattedParams.push({label: 'endDateEnd', value: `${endDateEnd.getFullYear()}-${endDateEnd.getMonth()+1}-${endDateEnd.getDate()}`});
    }
    if(params.filterInfo.filterByUser && params.filterInfo.users.length) {
        params.filterInfo.users.forEach((user) => {
            formattedParams.push({label: 'userIds[]', value: user.id})
        })
    }
    return formattedParams;
}