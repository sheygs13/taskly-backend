require("./db/db");
const express = require("express");
const User = require("./models/user");

const app = express();
// parse body
app.use(express.json());

app.post("/api/v1/auth/users", (req, res) => {
      const { name, age, email, password } = req.body;
      const user = new User({ name, age, email, password });
      user.save()
            .then(() => {
                  res.status(201).json({
                        data: {
                              user,
                              message: "User account successfully created",
                        },
                        status: "success",
                  });
            })
            .catch(({ message }) => {
                  res.status(400).json({
                        error: message,
                        status: "error",
                  });
            });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on port ${port}...`));
