import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ImageType } from "src/app/components/image/image.component";
import { ImagesActions } from "./images.actions";
import { append, patch } from '@ngxs/store/operators';


const IMAGES_PER_PAGE = 12;
const LAST_PHOTO_ID = 313;

type ImagesStateData = {
    imagesList: ImageType[],
    galleryListIds: number[],
    selectedImageId: number,
    currentPage: number,
    noMorePhotos: boolean
}

const getImagesInitialState = (): ImagesStateData => ({
    imagesList: [],
    galleryListIds: [],
    selectedImageId: 0,
    currentPage: 0,
    noMorePhotos: false
})

@State<ImagesStateData>({
    name: 'images',
    defaults: getImagesInitialState()
})
@Injectable()
export class ImagesState {

    @Selector()
    static galleryList(state: ImagesStateData) {
        // sort imagesList
        return state.imagesList.filter((image: ImageType) => state.galleryListIds.includes(image.id))
    }

    @Selector()
    static selectedImage(state: ImagesStateData) {
        return state.imagesList.find((image: ImageType) => state.selectedImageId == image.id)
    }

    @Selector()
    static noMorePhotos(state: ImagesStateData) {
        return state.noMorePhotos
    }

    @Action(ImagesActions.GetImages)
    async getImages(ctx: StateContext<ImagesStateData>, action: ImagesActions.GetImages) {
        let newImages: ImageType[] = []
        let noMorePhotos = false;

        for (const idx of [...Array(IMAGES_PER_PAGE).keys()].map(x => x + 1)) {
            const imageId = this._verifyExceptions(action.page * IMAGES_PER_PAGE + idx);

            if(imageId > LAST_PHOTO_ID) {
                noMorePhotos = true;
                continue;
            }

            const imageKey = `new-photo-${this._addZeros(imageId)}`

            if(newImages.find(img => img.id == imageId) || ctx.getState().galleryListIds.includes(imageId)) continue;


            newImages.push({
                id: imageId,
                url: this._getImageURL(imageKey)
            })
        }

        ctx.setState(
            patch({
                imagesList: append(newImages),
                galleryListIds: [...ctx.getState().galleryListIds, ...newImages.map((img: ImageType) => img.id)].sort(),
                currentPage: action.page,
                noMorePhotos: noMorePhotos
            })
        );
    }

    @Action(ImagesActions.SelectImage)
    async selectImage(ctx: StateContext<ImagesStateData>, action?: ImagesActions.SelectImage) {
        ctx.setState(
            patch({
                selectedImageId: action?.selectedImageId
            })
        )

    }

    @Action(ImagesActions.SelectNextImage)
    async selectNextImage(ctx: StateContext<ImagesStateData>, action?: ImagesActions.SelectNextImage) {

        const newId = ctx.getState().selectedImageId + 1

        if(newId % IMAGES_PER_PAGE == 0) {
            this.getImages(ctx, {page: ctx.getState().currentPage + 1});
        }

        ctx.setState(
            patch({
                selectedImageId: newId
            })
        )
    }

    @Action(ImagesActions.SelectPreviousImage)
    async selectPreviousImage(ctx: StateContext<ImagesStateData>, action?: ImagesActions.SelectPreviousImage) {
        ctx.setState(
            patch({
                selectedImageId: ctx.getState().selectedImageId - 1
            })
        )
    }

    private _getImageURL(imageKey: string): string{
        return `https://jas-wedding-photos.s3.eu-west-2.amazonaws.com/${imageKey}.png`
    }

    private _addZeros(idx: number): string {
        switch(idx.toString().length){
            case 1:
                return `00${idx}`;
            case 2:
                return `0${idx}`
            default:
                return idx.toString();
        } 
    }

    private _verifyExceptions(idx: number): number {
        const exceptions = [11, 15, 23, 26, 27, 29, 34, 35, 38, 48, 49, 56, 57, 58, 59, 62, 110, 180, 183, 187, 194, 197, 217, 219, 248, 261, 311]

        if(exceptions.includes(idx)) {
            return this._verifyExceptions(idx + 1)
        }

        return idx;
    }

}