import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ImageType } from "src/app/components/image/image.component";
import { ImagesActions } from "./images.actions";
import { append, patch } from '@ngxs/store/operators';


const IMAGES_PER_PAGE = 12;

type ImagesStateData = {
    imagesList: ImageType[],
    galleryListKeys: string[],
    selectedImageKey: string
}

const getImagesInitialState = (): ImagesStateData => ({
    imagesList: [],
    galleryListKeys: [],
    selectedImageKey: ''
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
        return state.imagesList.filter((image: ImageType) => state.galleryListKeys.includes(image.key))
    }

    @Selector()
    static selectedImage(state: ImagesStateData) {
        return state.imagesList.find((image: ImageType) => state.selectedImageKey == image.key)
    }

    @Action(ImagesActions.GetImages)
    async getImages(ctx: StateContext<ImagesStateData>, action: ImagesActions.GetImages) {
        console.log('entrou')
        const newImages: ImageType[] = [1,2,3,4,5,6,7,8,9,10,11,12].map((idx) => {
            const imageKey = `new-photo ${action.page * IMAGES_PER_PAGE + idx}`

            return {
                key: imageKey,
                url: this._getImageURL(imageKey)
            }
        })

        ctx.setState(
            patch({
                imagesList: append(newImages),
                galleryListKeys: append(newImages.map((img: ImageType) => img.key))
            })
        );
    }

    @Action(ImagesActions.SelectImage)
    async selectImage(ctx: StateContext<ImagesStateData>, action?: ImagesActions.SelectImage) {

    }

    @Action(ImagesActions.SelectNextImage)
    async selectNextImage(ctx: StateContext<ImagesStateData>, action?: ImagesActions.SelectNextImage) {

    }

    @Action(ImagesActions.SelectPreviousImage)
    async selectPreviousImage(ctx: StateContext<ImagesStateData>, action?: ImagesActions.SelectPreviousImage) {

    }

    private _getImageURL(imageKey: string): string{
        return `https://jas-wedding-photos.s3.eu-west-2.amazonaws.com/${imageKey}.png`
    }

}