/*!
* Copyright(c) 2016 Santi 'AdamJames' T. <santitm99@github>
* MIT Licensed
*/
'use strict';

const events =
{
	// Status
	READY: 'ready',
	// Channels
	CHANNEL_CREATED: 'channel_create',
	CHANNEL_UPDATED: 'channel_update',
	CHANNEL_DELETED: 'channel_delete',
	// Guilds
	SERVER_CREATED: 'guild_create',
	SERVER_UPDATED: 'guild_update',
	SERVER_DELETED: 'guild_delete',
	SERVER_ROLE_CREATED: 'guild_role_create',
	SERVER_ROLE_UPDATED: 'guild_role_update',
	SERVER_ROLE_DELETED: 'guild_role_delete',
	// Users
	SERVER_USER_ADDED: 'guild_member_add',
	SERVER_USER_UPDATED: 'guild_member_update',
	SERVER_USER_DELETED: 'guild_member_delete',
	USER_UPDATED: 'presence_update',
	// Messages
	MESSAGE: 'message_create',
	MESSAGE_UPDATED: 'message_update',
	MESSAGE_DELETED: 'message_delete',
}

module.exports = events;