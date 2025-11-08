import { Injectable } from '@angular/core';
import { createApi } from 'unsplash-js';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { from, map, Observable } from 'rxjs';
import { Full } from 'unsplash-js/dist/methods/photos/types';
import { environment } from '@environments/environment';
import { ICollection, IPhoto } from '@app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {
  api;

  constructor() {
    this.api = createApi({ accessKey: environment.unsplashAccessKey });
  }

  listCollections(
    page: number,
    perPage: number
  ): Observable<
    ApiResponse<{
      results: ICollection[];
      total: number;
    }>
  > {
    return from(this.api.collections.list({ page: page, perPage: perPage }));
  }

  listCollectionPhotos(id: string): Observable<
    ApiResponse<{
      results: IPhoto[];
      total: number;
    }>
  > {
    return from(this.api.collections.getPhotos({ collectionId: id }));
  }

  getPhoto(id: string): Observable<ApiResponse<Full>> {
    return from(this.api.photos.get({ photoId: id }));
  }

  //   getPhoto(id: string): Observable<ApiResponse<IPhoto>> {
  //   return from(this.api.photos.get({ photoId: id })).pipe(
  //     map((response): ApiResponse<IPhoto> => {
  //       if (response.type === 'success') {
  //         const raw = response.response;

  //         const safePhoto: IPhoto = {
  //           id: raw.id,
  //           width: raw.width,
  //           height: raw.height,
  //           color: raw.color ?? '#000000',
  //           description: raw.description ?? '',
  //           alt_description: raw.alt_description ?? '',
  //           urls: {
  //             raw: raw.urls.raw,
  //             full: raw.urls.full,
  //             regular: raw.urls.regular,
  //             small: raw.urls.small,
  //             thumb: raw.urls.thumb,
  //             small_s3: raw.urls.small_s3 ?? raw.urls.small // fallback
  //           },
  //           links: {
  //             self: raw.links.self,
  //             html: raw.links.html,
  //             download: raw.links.download,
  //             download_location: raw.links.download_location
  //           },
  //           user: {
  //             id: raw.user.id,
  //             username: raw.user.username,
  //             name: raw.user.name,
  //             first_name: raw.user.first_name,
  //             last_name: raw.user.last_name ?? '',
  //             profile_image: {
  //               large: raw.user.profile_image.large,
  //               medium: raw.user.profile_image.medium,
  //               small: raw.user.profile_image.small
  //             },
  //             portfolio_url: raw.user.portfolio_url ?? '',
  //             location: raw.user.location ?? ''
  //           },
  //           likes: raw.likes ?? 0,
  //           views: raw.views ?? 0
  //         };

  //         return {
  //           ...response,
  //           response: safePhoto
  //         };
  //       }

  //       return response;
  //     })
  //   );
  // }
}
