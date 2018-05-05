module.exports = (app, config) => {
    app.use(`/${config.env[config.mode].apiUrlBasePath}/`, require('./modules/auth/authRouter'));
    app.use(`/${config.env[config.mode].apiUrlBasePath}/`, require('./modules/user/userRouter'));
}