# Guestar iOS App (React Native + Flux)

Guestar iOS App built with React Native + Flux + HMR + Webpack + ES6.<br />To get it work follow this steps:

    git clone https://github.com/paolorovella/guestar
    cd guestar
    npm install
    npm run hot

# Webpack, Babel and Hot Module Replacement

The starting point of your project is in the folder App, dont forget to update the webpack config file if you change this.

The babel loader is also preconfigured, so you can use full ES2015/ES6 in your code ;)

Make sure you select *Debug in chrome* option (CMD+D) to get HMR

# Use it on your device

To use this app on your device 

    npm run ios IP

Where IP is the IP address of your Mac. 
You must change the IP address in other two files:

- iOS/Application/AppDelegate.m at line 40 change

		jsCodeLocation = [NSURL URLWithString:@"http://IP:8080/index.ios.bundle?platform=ios&dev=true"];

- Open iOS/Guestar.xcodeproj and in Libraries/RCTWebSocket.xcodeproj/RCTWebSocketExecutor change

		return [self initWithURL:[RCTConvert NSURL:@"http://IP:8081/debugger-proxy"]];

Connect your iPhone and in XCode press play
