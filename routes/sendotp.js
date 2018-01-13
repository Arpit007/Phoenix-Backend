

router.post('/user', function (req, res) {
    "use strict";
    const userID = req.body.userID;
    return model.status.getStatusForUser(userID)
        .then((status) => {
            let reply = response(statusCode.Ok);
            reply.body.status = status;
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});


module.exports = router;