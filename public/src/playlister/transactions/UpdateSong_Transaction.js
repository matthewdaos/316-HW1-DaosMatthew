import { jsTPS_Transaction } from '../../jstps/index.js'
import PlaylisterModel from '../PlaylisterModel.js';
import PlaylistSongPrototype from '../PlaylistSongPrototype.js';

/**
 * UpdateSong_Transaction
 * 
 * This class represents a transaction that updates a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 */
export default class UpdateSong_Transaction extends jsTPS_Transaction {
    /**
     * Initializes this object such that it can both do and undo the transaction
     * 
     * @param {PlaylisterModel} initModel The M in MVC for this app
     * @param {number} initIndex The index of where the song is to be created in the playlist
     * @param {PlaylistSongPrototype} initOldSong The old version of song before updated
     * @param {PlaylistSongPrototype} initNewSong The new version of song after updated
     */
    constructor(initModel, initIndex, initOldSong, initNewSong) {
        super();
        this.model = initModel;
        this.index = initIndex;

        // Old song values
        this.oldTitle = initOldSong.title;
        this.oldArtist = initOldSong.artist;
        this.oldYouTubeId = initOldSong.youTubeId;
        this.oldYear = initOldSong.year;

        // New song values
        this.newTitle = initNewSong.title;
        this.newArtist = initNewSong.artist;
        this.newYouTubeId = initNewSong.youTubeId;
        this.newYear = initNewSong.year;
    }

    /**
     * Executed when this transaction is first done or redone.
     */
    doTransaction(){
        this.model.updateSong(this.index, this.newTitle, this.newArtist, this.newYouTubeId, this.newYear);
    }

    /**
     * Execute when transaction is undone.
     */
    undoTransaction() {
        this.model.updateSong(this.index, this.oldTitle,  this.oldArtist, this.oldYouTubeId, this.oldYear);
    }
}