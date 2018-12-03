import fetch from '@/utils/fetch'

//省
export function getCascaderData() {
  return fetch({
    url: '/region/getProvince',
    method: 'get',
    // data:query
  })
}

//市
export function getCity(id) {
  return fetch({
    url: '/region/getCity',
    method:'get',
    params:{
      pid:id
    }
  })
}

export function getArea(id1) {
  return fetch({
    url: '/region/getArea',
    method:'get',
    params:{
      pid:id1
    }
  })
}

export function getRoad(id3) {
  return fetch({
    url: '/region/getRoad',
    method:'get',
    params:{
      pid:id3
    }
  })
}

export function getCommunityList(query) {
    return fetch({
      url: `/community/communityListInfo`,
      method: 'post',
      data: query
    })
  }


  //获取详情
  export function getHusDetail(neigbodCode) {
    return fetch({
      url: '/houseNeighborhood/findNeighborhoodInfo',
      method: 'post',
      data: {
        neigbodCode:neigbodCode
      }
    })
  }

  export function getLittleList(query) {
    return fetch({
      url: '/houseNeighborhood/findNeighborhoodList',
      method: 'post',
      data:query
    })
  }

  //提交
  export function submitHus(query) {
    return fetch({
      url: '/houseNeighborhood/saveNeighborhood',
      method: 'post',
      data:{
        name: query.name,
        communityCode: query.communityCode,
        provinceCode: query.provinceCode,
        cityCode: query.cityCode,
        areaCode: query.areaCode,
        plateCode: query.plateCode,
        province: query.province,
        city: query.city,
        area: query.area,
        plate: query.plate,
        address: query.address,
        architecturalAge: query.architecturalAge,
        propertyName: query.propertyName,
        propertyTelephone: query.propertyTelephone,
        trafficsituation: query.trafficsituation,
        aroundsupporting: query.aroundsupporting
      }
    })
  }

//修改
 export function submitChangeDta(query) {
    return fetch({
      url: '/houseNeighborhood/updateNeighborhood',
      method: 'post',
      data:{
        name: query.name,
        communityCode: query.communityCode,
        provinceCode: query.provinceCode,
        cityCode: query.cityCode,
        areaCode: query.areaCode,
        plateCode: query.plateCode,
        address: query.address,
        architecturalAge: query.architecturalAge,
        propertyName: query.propertyName,
        propertyTelephone: query.propertyTelephone,
        trafficsituation: query.trafficsituation,
        aroundsupporting: query.aroundsupporting,
        propertyCode: query.propertyCode,
        propertyId: query.propertyId,
        neighborhoodId: query.neighborhoodId,
        neigbodCode: query.neigbodCode,
        province: query.province,
        city: query.city,
        area: query.area,
        plate: query.plate,
        version: query.version
      }
    });
  }

  //删除
  export function deleteMenuBtn(neigbodCode, version) {
    return fetch({
      url: '/houseNeighborhood/deleNeighborhood',
      method: 'get',
      params: { neigbodCode: neigbodCode, version: version }
    });
  }

export function selectCommunityListAll() {
  return fetch({
    url: '/community/selectCommunityListAll',
    method: 'get'
  })
}
