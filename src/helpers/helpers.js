const ALLOWED_USER_UPDATES = ['email', 'password'];

const ALLOWED_TASK_UPDATES = ['description', 'completed'];

const trimPublicProfile = ({ _id, email, name, createdAt, updatedAt }) => ({
        _id,
        email,
        name,
        createdAt,
        updatedAt,
});

const handleUserUpdate = (update) => ALLOWED_USER_UPDATES.includes(update);

const handleTaskUpdate = (update) => ALLOWED_TASK_UPDATES.includes(update);

const allowedUpdates = (req = {}, updateType = '') => {
        const clientUpdates = Object.keys(req);

        let isValid = false;

        if (updateType === 'user') {
                isValid = clientUpdates.every(handleUserUpdate);
        }
        if (updateType === 'task') {
                isValid = clientUpdates.every(handleTaskUpdate);
        }

        return isValid;
};

const updateRecord = (item = {}, bodyReq = {}) => {
        const clientUpdates = Object.keys(bodyReq);
        for (const update of clientUpdates) {
                item[update] = bodyReq[update];
        }
};

const removeSessionTokens = (tokens = [], reqToken = '') =>
        tokens.filter((tokenObj) => tokenObj.token !== reqToken);

const handleSuccessResponse = (res, code, data = {}) => {
        res.status(code).json({
                status: 'success',
                data,
        });
};

const handleErrorResponse = (res, code, errorMessage = '') => {
        res.status(code).json({
                status: 'fail',
                error: errorMessage,
        });
};

const hasBody = (obj = {}) => Object.keys(obj).length;

const returnMessage = (arr) => {
        return `${arr.length > 1 ? `${arr.length} tasks` : `${arr.length} task`}  found.`;
};

const paginateData = (Limit, Skip) => ({
        limit: +Limit,
        skip: +Skip,
});

const sortOption = (sortBy) => {
        const sort = {};
        let parts = [];
        if (sortBy) {
                parts = sortBy.split(':');
                sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        }
        return {
                ...sort,
        };
};

module.exports = {
        trimPublicProfile,
        handleErrorResponse,
        handleSuccessResponse,
        allowedUpdates,
        updateRecord,
        removeSessionTokens,
        hasBody,
        returnMessage,
        paginateData,
        sortOption,
};
