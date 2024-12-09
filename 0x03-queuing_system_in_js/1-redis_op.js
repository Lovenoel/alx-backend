import redis from "redis";

const client = redis.createClient();

client.on("connect", () => {
  console.log("Redis client connected to the server");
});

client.on("error", (err) => {
  console.log(`Redis client not connected tot the server: ${err.message}`);
});

const setNewSchool = (schoolName, value) => {
    client.set(schoolName, value, redis.print);
};

const displaySchoolValue = (schoolName) => {
    client.get(schoolName, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });
};

displaySchoolValue('ALX');
setNewSchool('ALXSanFrancisco', '100');
displaySchoolValue('ALXSanFrancisco')