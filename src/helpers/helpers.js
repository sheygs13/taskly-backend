const ALLOWED_USER_UPDATES = ['email', 'password'];

const ALLOWED_TASK_UPDATES = ['description', 'completed'];
/**
 * @param  {} {_id
 * @param  {} email
 * @param  {} name
 * @param  {} createdAt
 * @param  {} updatedAt}
 */
const trimPublicProfile = ({ _id, email, name, createdAt, updatedAt }) => ({
        _id,
        email,
        name,
        createdAt,
        updatedAt,
});

const handleUserUpdate = (update) => ALLOWED_USER_UPDATES.includes(update);

const handleTaskUpdate = (update) => ALLOWED_TASK_UPDATES.includes(update);
/**
 * @param  {} req={}
 * @param  {} updateType=''
 */
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
/**
 * @param  {} item={}
 * @param  {} bodyReq={}
 */
const updateRecord = (item = {}, bodyReq = {}) => {
        const clientUpdates = Object.keys(bodyReq);
        for (const update of clientUpdates) {
                item[update] = bodyReq[update];
        }
};
/**
 * @param  {} tokens=[]
 * @param  {} reqToken=''
 */
const removeSessionTokens = (tokens = [], reqToken = '') =>
        tokens.filter((tokenObj) => tokenObj.token !== reqToken);
/**
 * @param  {} res
 * @param  {} code
 * @param  {} data={}
 */
const handleSuccessResponse = (res, code, data = {}) => {
        res.status(code).json({
                status: 'success',
                data,
        });
};
/**
 * @param  {} res
 * @param  {} code
 * @param  {} errorMessage=''
 */
const handleErrorResponse = (res, code, errorMessage = '') => {
        res.status(code).json({
                status: 'fail',
                error: errorMessage,
        });
};
/**
 * @param  {} obj={}
 */
const hasBody = (obj = {}) => Object.keys(obj).length;

const returnMessage = (arr) => {
        return `${arr.length > 1 ? `${arr.length} tasks` : `${arr.length} task`}  found.`;
};
/**
 * @param  {} Limit
 * @param  {} Skip
 */
const paginateData = (Limit, Skip) => ({
        limit: +Limit,
        skip: +Skip,
});
/**
 * @param  {} sortBy
 */
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
