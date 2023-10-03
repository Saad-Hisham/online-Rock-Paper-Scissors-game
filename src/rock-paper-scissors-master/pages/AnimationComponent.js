import React, { useEffect, useRef } from "react";

function AnimationComponent() {



        const confettiPlayers = useRef([]);

        const makeItConfetti = () => {
            const confetti = document.querySelectorAll(".confetti");

            if (!confetti[0].animate) {
                return false;
            }

            for (let i = 0, len = confetti.length; i < len; ++i) {
                const candycorn = confetti[i];
                candycorn.innerHTML = '<div class="rotate"><div class="askew"></div></div>';
                const scale = Math.random() * 0.7 + 0.3;
                const player = candycorn.animate(
                    [
                        { transform: `translate3d(${(i / len) * 100}vw,-5vh,0) scale(${scale}) rotate(0turn)`, opacity: scale },
                        {
                            transform: `translate3d(${(i / len) * 100 + 10}vw,105vh,0) scale(${scale}) rotate(${Math.random() > 0.5 ? "" : "-"}2turn)`,
                            opacity: 1,
                        },
                    ],
                    {
                        duration: Math.random() * 3000 + 5000,
                        iterations: Infinity,
                        delay: -(Math.random() * 7000),
                    }
                );

                confettiPlayers.current.push(player);
            }
        };

        useEffect(() => {
            makeItConfetti();
            onChange({ currentTarget: { value: "bookmarks" } });

            return () => {
                confettiPlayers.current.forEach((player) => player.cancel());
            };
        }, []);

        const onChange = (e) => {
            document.body.setAttribute("data-type", e.currentTarget.value);
            confettiPlayers.current.forEach((player) => (player.playbackRate = e.currentTarget.value === "bookmarks" ? 2 : 1));
        };

        return (

            <div class="confetti-land">
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
            </div>



        )
    }
    export default AnimationComponent