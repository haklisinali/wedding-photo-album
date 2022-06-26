import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ImageType } from "src/app/components/image/image.component";
import { ImagesActions } from "./images.actions";
import { append, patch } from '@ngxs/store/operators';


const IMAGES_PER_PAGE = 12;

type ImagesStateData = {
    imagesList: ImageType[],
    galleryListIds: number[],
    selectedImageId: number,
    currentPage: number, 
}

const getImagesInitialState = (): ImagesStateData => ({
    imagesList: [],
    galleryListIds: [],
    selectedImageId: 0,
    currentPage: 0
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

    @Action(ImagesActions.GetImages)
    async getImages(ctx: StateContext<ImagesStateData>, action: ImagesActions.GetImages) {
        const newImages: ImageType[] = [1,2,3,4,5,6,7,8,9,10,11,12].map((idx) => {
            const imageId = action.page * IMAGES_PER_PAGE + idx;
            const imageKey = `new-photo ${imageId}`

            return {
                id: imageId,
                url: this._getImageURL(imageKey)
            }
        })

        ctx.setState(
            patch({
                imagesList: append(newImages),
                galleryListIds: [...ctx.getState().galleryListIds, ...newImages.map((img: ImageType) => img.id)].sort(),
                currentPage: action.page
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
            console.log('requested new images')
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

}