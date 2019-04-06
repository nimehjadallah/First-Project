(function(){

    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                // User successfully signed in.
                
                return true;
            },
            uiShown: function () {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: 'main.html', //THIS IS WHERE YOU GO ONCE LOGGED IN
        signInOptions: [
            
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            
        ],
        
    };

    ui.start("#firebaseui-auth-container", uiConfig);
})()
