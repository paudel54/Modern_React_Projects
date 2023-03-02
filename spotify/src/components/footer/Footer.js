import React, { useEffect, useState } from "react";
// import { useStateValue } from "./StateProvider";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { Grid, Slider } from "@material-ui/core";
import './footer.scss';
const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer__left">
                <img className="footer__albumLogo" src="https://i.pinimg.com/originals/9d/db/33/9ddb334887bf6af1b5113b88c85dd9e5.jpg" alt="selina" />
                <div className="footer__songInfo">
                    <h4>CalmDown!</h4>
                    <p>Selena Gomez</p>
                </div>
            </div>
            <div className="footer__center">
                <ShuffleIcon className="footer__green" />
                <SkipPreviousIcon className="footer__icon" />
                <PlayCircleIcon fontSize="large" className="footer__icon" />
                <SkipNextIcon className="footer__icon" />
                <RepeatIcon className="footer__green" />

            </div>
            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continuous-slider" />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
