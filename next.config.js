// next.config.js
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https', 
          hostname: 'links.papareact.com', 
          pathname: '/**', 
        },
        {
          protocol: 'https', 
          hostname: 'loremflickr.com', 
          pathname: '/**', 
        },
      ],
    },
};
  
  