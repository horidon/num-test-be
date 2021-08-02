# Docker set up
```shell
docker build . -t num-test-be
docker run -p 4000:4000 -d num-test-be
```

# Manual set up
Please be sure that you are using node 16th version
```shell
yarn build && yarn serve
```
