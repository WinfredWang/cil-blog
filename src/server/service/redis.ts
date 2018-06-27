import * as redis from "redis";

var enableRedis = process.env['npm_package_config_enableRedis'] === "true";
var redisClient = redis.createClient('6379', '127.0.0.1');
redisClient.on("error", function (error) {
    console.log(error);
    enableRedis = false;
});

redisClient.on('connect', function () {
    console.log("connected to redis server.");
})

export var TagCache = {
    getTags: function (): Promise<any> {
        return new Promise((resolve, reject) => {
            redisClient.get('tag', function (err, tag) {
                if (!enableRedis || err || !tag) {
                    reject(err);
                } else {
                    console.log('Query tags from cache.')
                    resolve(tag);
                }
            });
        })
    },
    setTags: function (tags: any) {
        enableRedis && redisClient.set('tag', JSON.stringify(tags));
    }
};