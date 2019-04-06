var mainApp = {};

(function () {
    // var uid = null;
    var firebase = app_fireBase;
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // User is signed in.
            this.userId = user.uid; // calling current user and saving key

            //creates/updates the user in the database using info from Auth.
            firebase
                .database().ref("users/" + this.userId).update({
                    email: user.email
                });

            //sets up database info for current user
            var userSnap = firebase.database().ref("users/" + user.uid);

            userSnap.on("value", function (snap) {

//                 console.log(snap.val());
//                 console.log(snap.val().email);
//                 console.log(snap.val().userName);
//                 console.log(snap.val().city);

                var checked = localStorage.getItem('check');
                if (checked == "true" + snap.val().userName) {
                    $("#form").hide();
                }

                $("#email").text(snap.val().email);
                $("#userName").text(snap.val().userName);
                $("#city").text(snap.val().city);
                $("#interest").text(snap.val().userInterest);
                $("#city").text(snap.val().city);

            });

        } else {
            //redirects to login-page

            window.location.replace("index.html"); //takes you back to login page
        }
    });

    function logOut() {
        firebase.auth().signOut();
    }

    mainApp.logOut = logOut;
})();
