class AppServices {
    static editPictureStyles(pictureUrl) {
        const imgStyles = {objectFit: 'cover'};
        if (pictureUrl.search(/image_not_available/) !== -1) {
            imgStyles.objectFit = 'contain';
        }
        return imgStyles;
    }
}

export default AppServices;