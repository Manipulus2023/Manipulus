package com.Manipulus.arctic.user.service;

import com.Manipulus.arctic.user.dao.RoleDao;
import com.Manipulus.arctic.user.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleDao roleDao;
    public Role createNewRole(Role role){
      return roleDao.save(role);

    }
}
