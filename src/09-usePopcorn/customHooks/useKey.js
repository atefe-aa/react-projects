import { useEffect } from "react";

export function useKey(key, action){
    useEffect(
        function () {
          function callback(e) {
            if (e.code.toLowerCase() === key.toLowerCase()) {
              action();
            }
          }
          document.addEventListener("keydown", callback);
    
          return function () {
            //to prevent having so many event listners which causes memory problems
            document.removeEventListener("keydown", callback);
          };
        },
        [action, key]
      );
    
}