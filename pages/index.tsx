import { useState } from "react";
import Map from "react-map-gl";
import DeckGL from "@deck.gl/react/typed";
import { Tile3DLayer } from "@deck.gl/geo-layers/typed";
import { CesiumIonLoader } from "@loaders.gl/3d-tiles";

const mapStyle = "mapbox://styles/mapbox/light-v10";

const cesiumIon = {
  assetId: 1410444,
  token: process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN,
  tilesetUrl: `https://assets.cesium.com/1410444/tileset.json`,
};

const INITIAL_VIEW_STATE = {
  latitude: -48.6229945673,
  longitude: -27.5504091458,
  pitch: 45,
  maxPitch: 60,
  bearing: 0,
  minZoom: 2,
  maxZoom: 30,
  zoom: 14,
};

export default function Home() {
  const [initialViewState, setInitialViewState] = useState(INITIAL_VIEW_STATE);

  const layer3D = new Tile3DLayer({
    id: "layer-3d",
    pointSize: 2,
    data: cesiumIon.tilesetUrl,
    loader: CesiumIonLoader,
    loadOptions: {
      "cesium-ion": {
        accessToken: cesiumIon.token,
      },
    },
    onTilesetLoad(tile) {
      const { cartographicCenter } = tile;
      if (cartographicCenter) {
        setInitialViewState({
          ...INITIAL_VIEW_STATE,
          longitude: cartographicCenter[0],
          latitude: cartographicCenter[1],
          zoom: 14,
        });
      }
    },
  });

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={[layer3D]}
    >
      <Map
        reuseMaps
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle={mapStyle}
      ></Map>
    </DeckGL>
  );
}
