export namespace ImagesActions {
    export class GetImages {
        static readonly type = '[Images] Get more images';

        constructor(public page: number){}
    }

    export class SelectImage {
        static readonly type = '[Images] Select image';

        constructor(public selectedImageKey: string){}
    }

    export class SelectNextImage {
        static readonly type = '[Images] Get next image';

        constructor(){}
    }

    export class SelectPreviousImage {
        static readonly type = '[Images] Get previous image';

        constructor(){}
    }
}