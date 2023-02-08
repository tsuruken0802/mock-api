exports.successOrNg = {
    "result": "OK"
}

exports.errorResponse = {
    "error": { "code": "001", "message": "error message" },
}

exports.paginationResponse = (hasNextPage, currentPage) => {
    if (hasNextPage === undefined || currentPage === undefined) return {}
    return {
        "hasNextPage": hasNextPage,
        "currentPage": Number(currentPage),
    }
}